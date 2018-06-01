import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from '../../helpers/Api';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    componentDidMount() {
        this.loadReport(this.props.uri);
    }

    componentWillReceiveProps(props) {
        this.setState({ content: '' });
        this.loadReport(props.uri);
    }

    loadReport = (uri) => {
        Api.get('reports' + uri + '.html').then(
            (response) => {
                this.setState({ content: response.data });
            }
        ).catch(
            (error) => console.log(error)
        );
    }

    render() {
        return (
            this.state.content.length > 0 ? (
                <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            ) : (
                <div>Отчет загружается...</div>
            )
        );
    }
}

Viewer.propTypes = {
    uri: PropTypes.string.isRequired
}

export default Viewer;
