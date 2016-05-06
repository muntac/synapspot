import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import jQuery from 'jquery';

window.$ = $;
window.jQuery = jQuery;


export default class Home extends Component{
  //Setting context to use React Router push funtcion
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {pictures: []};
  }

  componentWillMount(){
    var pictureList;
    $.ajax({
      type: "get",
      async: "false",
      url: "src/components/places.plist",
      dataType: "xml",
      success: function(xmlData) {
        var xmlString = (new XMLSerializer()).serializeToString(xmlData);
        var placeList = $.parseXML(xmlData);
        var plistlib = require('plistlib');
        plistlib.loadString(xmlString, (err, plist) => {
          pictureList = plist['value'];
          console.log(plist['value'][0]);
          this.setState({pictures: pictureList});
        });

        // console.log(pictureList);
      }.bind(this),
      error: function(xhr, status) {
        console.log("xml not found")
      }
    });
  }

  generateThumbnails(image){
    // place.value.imgtitle.value
    console.log(image.value.imgtitle.value);
    return (

        <div key={image.value.imgtitle.value} className="col-lg-3 col-md-4 col-xs-6 thumb custThumb">
          <div className="thumbnail">
            <img className="img-thumbnail" heigh="200" width="200" src={'src/components/images/' + image.value.imgtitle.value} alt="..."/>
            <div className="caption">
              <h3>{image.value.title.value}</h3>
              <p><a href={image.value.url.value} target="_blank" className="btn btn-primary" role="button">Go to Site</a></p>
            </div>
          </div>
        </div>

    );
  }
  render(){
    return(
      <div>
        <div className="col-lg-12">
          <h3 className="page-header">Thumbnail Gallery</h3>
        </div>
        <br /><br />
        <div className="row">
        {this.state.pictures.map((place) => {
          return this.generateThumbnails(place);
        })}
          </div>
      </div>
    );
  }
}