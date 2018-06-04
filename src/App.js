import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';
import Reporting from './components/reporting/Reporting';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportUri: ''
        };
    }

    handleReportSelect = (uri) => {
        this.setState({ reportUri: uri });
    }

    render() {
        return (
            <Grid className='max-height'>
                <Row><Col md={12}>&nbsp;</Col></Row>
                <Row>
                    <Col md={3} style={{paddingLeft: 30 + 'px'}}>Список отчетов</Col>
                    <Col md={9} style={{paddingLeft: 30 + 'px'}}>Окно отчета</Col>
                </Row>
                <Row><Col md={12}>&nbsp;</Col></Row>
                <Row className='max-height'>
                    <Col md={3} xs={12}>
                        <Reporting.List onSelect={this.handleReportSelect} />
                    </Col>
                    <Col md={9} xs={12} className='max-height'>
                        {(this.state.reportUri.length > 0) ? (
                            <Reporting.Viewer uri={this.state.reportUri} />
                        ) : (
                            <div>Отчет не выбран</div>
                        )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
