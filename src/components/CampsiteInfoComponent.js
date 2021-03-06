import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Col, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
Label } from 'reactstrap';
import {  Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        ); 
    }

   function FormatDate(date) {
        return(
            new Intl.DateTimeFormat('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))  
        );
    }

    function RenderComments({comments}) {
       if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4 className="header">Comments</h4>
                {comments.map (comment => (
                    <div key={comment.id}>
                    <p>{comment.text}<br />
                    -- {comment.author},  {this.formatDate(comment.date)}</p>
                </div> 
                )
                )}
                <CommentForm />
            </div>    
        )
    }
        return <div />
    }

    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            console.log("Current state is: " + JSON.stringify(values));
            alert("Current state is: " + JSON.stringify(values));
        }

        render() {
            return(
                <>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model="user.faveColor" id="user.faveColor">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text" md={2}>Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" rows="6" 
                                        placeholder="Comment"
                                        className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </>

            )
        }
    }


    function CampsiteInfo(props) {
        if (props.campsite) {
            console.log(props.campsite)
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                 </div>
            </div> 
            <div className="row">
                        <RenderCampsite campsite ={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }

   

export default CampsiteInfo;
