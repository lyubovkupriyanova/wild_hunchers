import React from 'react';
import { StyleSheet,
  FlatList,
  CameraRoll,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageEditor,
  ImageStore,
  PixelRatio } from 'react-native';
import { Text, View, Button } from 'native-base';
import Modal from 'react-native-modal';

// Constants
const numColumns = 3;  // number of columns in photoPicker FlatList
const numPhotos = 99;  // CameraRoll allows get only first N photos, so we need to choose that value

// Component is responsible for loading new userpic
// Because it has local state and we want to backup it we extend GalleryPicker from BackUpStateComponent
export default class GalleryPicker extends React.Component {
  state={
    activePhoto: numPhotos, // index of a chosen photo is in a range from 0 to numPhotos - 1, so initial state corresponds to no photo has been chosen
    photos: []
  }
  constructor(props) {
    super(props);
  }

  // Load photos from gallery
  componentDidMount() {
    if (this.state.photos.length == 0) {
      this.loadPhotos();
    }
  }

  // Android back button handler
  onBackPress = () => {
    this.props.stopLoading();
    return true;
  }

  // Load photos from gallery to the state
  loadPhotos() {
    CameraRoll.getPhotos({
      first: numPhotos,
      assetType: 'Photos'
    })
    .then(res => {
      this.setState({ photos: res.edges });
    })
    .catch((err) => {
      //Error loading Images
      console.log('Loading Image Error', err);
    });
  }

  // Crop image, save it in cache and call _getBase64 method
  onConfirmChoice = () => {
    const { height, uri, width } = this.state.photos[this.state.activePhoto].node.image;

    // We save compressed image with shape from props measured in dpi
    // In case if some props is missed we get size from image
    let imageFitPixelHeight = height;
    let imageFitPixelWidth = width;
    if(this.props.targetHeight_dpi) {
      imageFitPixelHeight = PixelRatio.getPixelSizeForLayoutSize(this.props.targetHeight_dpi);
      if(this.props.targetWidth_dpi) {
        // If both width and height props exist
        imageFitPixelWidth = PixelRatio.getPixelSizeForLayoutSize(this.props.targetWidth_dpi);
      } else {
        // If only target height props exist compute target width conserving ratio of image
        imageFitPixelWidth = Math.trunc(imageFitPixelHeight * width / height);
      }
    } else if(this.props.targetWidth_dpi) {
      // If only target width props exist compute target height conserving ratio of image
      imageFitPixelWidth = PixelRatio.getPixelSizeForLayoutSize(this.props.targetWidth_dpi);
      imageFitPixelHeight = Math.trunc(imageFitPixelWidth * height / width);
    }

    // Define minimum ratio = height / width to compute heignt and width of cropping
    let fitWidth = width;
    let fitHeight = height;
    let ratio_image = height / width;  // ratio for image from gallery
    let ratio_target = imageFitPixelHeight / imageFitPixelWidth;  // target ratio defined in props
    if (ratio_image > ratio_target) {
      // Get the same width as image has
      fitHeight = Math.trunc(ratio_target * fitWidth);
    } else {
      // Get the same heigth as image has
      fitWidth = Math.trunc(fitHeight / ratio_target);
    }

    // Crop settings for ImageEditor
    const cropData = {
      offset: {
        x: Math.trunc((width - fitWidth) / 2),
        y: Math.trunc((height - fitHeight) / 2)
      },
      size: { width: fitWidth, height: fitHeight },
      displaySize: { width: imageFitPixelWidth, height: imageFitPixelHeight },
      resizeMode: 'cover'
    }

    // To understand what happens: https://facebook.github.io/react-native/docs/imageeditor
    ImageEditor.cropImage( uri,
      cropData,
      (uri) => { this._getBase64(uri) },
      (err) => {
        console.log(err);
      }
    );
  }

  // Get base64 image from image store
  _getBase64(uri) {
    ImageStore.getBase64ForTag(uri,
      (base64) => {
        // Call now both callbacks
        this.props.onChoosePhoto(base64, uri);
      },
      (failure) => { });
  }

  // Functions for FlatList component
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={ ()=>{ this.setState({ activePhoto: index })}}
        style={ styles.photoContainer }>
        <Image
          style={ [ styles.photoSmall, (this.state.activePhoto == index) && styles.photoChosen ] }
          source={{ uri: item.node.image.uri }}/>
      </TouchableOpacity>
    );
  }

  _keyExtractor = (item, index) => index;

  render() {
    return(
      <Modal isVisible={ true } onBackButtonPress={ this.onBackPress }>
        <View style={ styles.container }>
          <View><Text style={ styles.title }>{ this.props.title }</Text></View>

          <View style={ styles.flatListView }>
            <FlatList
              data={ this.state.photos }
              keyExtractor={ this._keyExtractor }
              renderItem={ this._renderItem }
              numColumns={ numColumns }
              activePhoto={ this.state.activePhoto }
            />
          </View>

          <Button style={ styles.backBtn } onPress={ this.onConfirmChoice } disabled={ this.state.activePhoto < numPhotos ? false : true }><Text>{ 'NEXT' }</Text></Button>
          <Button style={ styles.backBtn } onPress={ this.props.stopLoading }><Text>{ 'BACK' }</Text></Button>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '95%',
    borderRadius: 5,
    borderColor: '#666',
    borderWidth: 1,
    backgroundColor: '#dbf3ff',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5
  },
  title: {
    alignSelf: 'center',
    margin: 10
  },
  flatListView: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#89c3ff'
  },
  photoContainer: {
    width: Dimensions.get('window').width / (numColumns + 1),
    height: Dimensions.get('window').width / (numColumns + 1),
    backgroundColor: '#89c3ff',
    margin: 4
  },
  photoSmall: {
    flex: 1
  },
  photoChosen: {
    margin: 2
  },
  backBtn: {
    height: 60,
    width: '96%',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
    alignSelf: 'center'
  }
})
