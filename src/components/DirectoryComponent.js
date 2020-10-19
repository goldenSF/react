import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Directory extends Component {
    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }
    render() {
        if (this.props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            );
        }
        return <div />;
    }
        
        
       return (
            <div className="container">
                 <div className="row">
                     {directory}
                     </div>
            </div>
        );
    }
}
export default Directory;





