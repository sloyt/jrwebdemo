import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, Well } from 'react-bootstrap';
import Api from '../../helpers/Api';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportList: []
        };
    }

    componentDidMount() {
        Api.get('rest_v2/resources', {
            params: {
                folderUri: '/reports',
                type: 'reportUnit',
                recursive: false
            }
        }).then(
            (response) => {
                this.setState({ reportList: response.data.resourceLookup });
            }
        ).catch(
            (error) => console.log(error)
        );
    }

    handleNavSelect = (key) => {
        this.props.onSelect(key);
    }

    render() {
        return(
            (this.state.reportList.length > 0) ? (
                <Nav bsStyle='pills' stacked onSelect={this.handleNavSelect}>
                    {this.state.reportList.map((item) => {
                        return <NavItem key={item.label} eventKey={item.uri}>{item.label}</NavItem>;
                    })}
                </Nav>
            ) : (
                <Well bsSize='small' bsStyle='warning'>Список загружается...</Well>
            )
        );
    }
}

List.propTypes = {
    onSelect: PropTypes.func.isRequired
}

export default List;
