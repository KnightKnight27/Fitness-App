import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Home extends Component {



    render() {

        if (this.props.trainings) {
            return (
                <div className="row">

                    {this.props.trainings}
                </div>

            );
        } else {
            return <div>Empty Dashboard</div>
        }
    }
}
const mapStateToProps = (state) => {
    return {
        trainings: state.rootReducer.trainings
            .map((training, index) => {
                return (
                    <div class="col s12 m4" key={index}>
                        <div class="card teal darken-1">
                            <div class="card-content white-text">
                                <span class="card-title center">{training.node.title}</span>
                                <p>{training.node.date}</p>
                                <br />
                                <p>{training.node.description}</p>
                            </div>
                            <div class="card-action center">
                                <Link to={"/training/" + training.node.id}>Details</Link>
                            </div>
                        </div>
                    </div>


                );
            })
    };
};

export default connect(mapStateToProps, actions)(Home);