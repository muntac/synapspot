import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import jQuery from 'jquery';

//noinspection JSAnnotator
window.$ = $;
window.jQuery = jQuery;


export default class Home extends Component{
  //Setting context to use React Router push function
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {pictures: []};
  }

  componentWillMount(){
    //Parse the places.plist file to obtain the list of places and images
    //Note: I've added the file names of each picture to this list
    //in order to avoid hard-coding them into the HTML
    var pictureList;
    $.ajax({
      type: "get",
      async: "false",
      url: "src/components/places.plist",
      dataType: "xml",
      success: function(xmlData) {
        var xmlString = (new XMLSerializer()).serializeToString(xmlData);
        var plistlib = require('plistlib');
        plistlib.loadString(xmlString, (err, plist) => {
          pictureList = plist['value'];
          console.log(plist['value'][0]);
          //Put the list of places into state
          this.setState({pictures: pictureList});
        });
      }.bind(this),
      error: function(xhr, status) {
        console.log("Data source not found")
      }
    });
  }

  generateThumbnails(place){
    //generate a box for the particular place containing the image, place title and site url
    return (
        <div key={place.value.imgtitle.value} className="col-lg-3 col-md-4 col-xs-6 thumb custThumb">
          <div className="thumbnail">
            <img className="img-thumbnail" height="200" width="200" src={'src/components/images/' + place.value.imgtitle.value} alt="..."/>
            <div className="caption">
              <h3>{place.value.title.value}</h3>
              <p><a href={place.value.url.value} target="_blank" className="btn btn-primary" role="button">Go To Site</a></p>
            </div>
          </div>
        </div>

    );
  }
  render(){
    return(
      <div>
        <div className="col-lg-12">
          <h3 className="page-header">Places to visit in Toronto</h3>
        </div>
        <br /><br />
        <div className="row">
        {
          this.state.pictures.map((place) => {
            return this.generateThumbnails(place);
          })
        }
          </div>
      </div>
    );
  }
}