import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions/index';


class Upload extends Component {
    state = {
        fireRedirect: false,
        sectionCount: 1,
        title: "",
        description: "",
        date: "",
        sections: []

    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSectionChange = e => {
        let newSections = this.state.sections;
        let sectionIndex = this.state.sectionCount - 1;
        newSections[sectionIndex] = { title: newSections[sectionIndex].title, time: e.target.value };

        this.setState({ sections: newSections });

    }
    handleSectionTitleChange = (e) => {
        let newSections = this.state.sections;
        let sectionIndex = this.state.sectionCount - 1;
        newSections[sectionIndex] = { title: e.target.value };
        this.setState({ sections: newSections });
    }

    handleTopicChange = e => {
        let subtopics = e.target.value;
        let topics = subtopics.split(',').map(topic => topic.trim());
        let newSections = this.state.sections;
        let sectionNumber = this.state.sectionCount;
        newSections[sectionNumber - 1].subtopics = topics;
        this.setState({ sections: newSections });

    }

    handleFinalSubmit = e => {
        e.preventDefault();
        const newSchedule = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            sections: this.state.sections
        }
        this.props.addTraining(newSchedule);
        this.props.fetchAllTrainings();
        this.setState({ fireRedirect: true });
    }

    render() {

        if (this.state.fireRedirect) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container" style={{ marginBottom: "20px" }}>
                <form>
                    <label htmlFor="title">Training Title</label>
                    <input type="text" id="title" onChange={this.handleChange}></input>
                    <label htmlFor="description"> Training Description</label>
                    <input type="text" id="description" placeholder="short one sentence description of training" onChange={this.handleChange}></input>

                    <label htmlFor="date">Date</label>
                    <input type="text" id="date" placeholder="yyyy-mm-dd" onChange={this.handleChange}></input>
                </form>
                <br />
                <hr />
                <form>
                    <label htmlFor="section-number" >Section#</label>
                    <input type="number" id="sectionCount" placeholder="start from 1" onChange={this.handleChange}></input>
                    <label htmlFor="title">Section Title</label>
                    <input type="text" id="title" onChange={this.handleSectionTitleChange}></input>
                    <label htmlFor="time">Section Time</label>
                    <input type="text" onChange={this.handleSectionChange} placeholder="hh:mm:ss" id="time"></input>
                    <label htmlFor="topics">Sub Topics</label>
                    <input type="text" id="topics" placeholder="enter comma separated time for each subtopic like- topic1,topic2,topic3..." onChange={this.handleTopicChange}></input>
                    <button type="reset">Click to add more sections</button>
                </form >
                <form onSubmit={this.handleFinalSubmit}>
                    <hr />
                    <button className="btn waves-effect waves-light" type="submit">
                        <i class="material-icons right">Add Schedule</i>
                    </button>
                </form>

            </div >
        );
    }
}

export default connect(null, actions)(Upload);