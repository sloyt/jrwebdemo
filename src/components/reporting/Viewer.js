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
        this.setState({ content: Api.defaults.baseURL + 'flow.html?_flowId=viewReportFlow&ParentFolderUri=/reports&reportUnit=' + uri + '&standAlone=true&decorate=no&j_username=joeuser&j_password=123456' });
    }

    render() {
        return (
            this.state.content.length > 0 ? (
                <iframe src={this.state.content} width='100%' height='100%' frameBorder={0} title='Отчет'></iframe>
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
