import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import PageSpinner from './../PageSpinner';
import {
    globalVariable
} from './../utils/global';

export default class SpaceFilters extends React.Component {
    state = {
        LaunchData: [],
        successLaunch: [],
        successLand: [],
        launch_year: '',
        launch_success: '',
        land_success: '',
        loading: true
    }

    /* Get data on load */
    componentDidMount = () => {
        this.getFilteredData()
    }

    /* change on filter buttons */
    async handleChange(e) {
        let updatedState = { ...this.state };
        updatedState[e.target.name] = e.target.value;
        await this.setState(updatedState)
        this.getFilteredData();
    }

    /* Get data on selecting filter */
    getFilteredData = () => {
        this.setState({ loading: true })
        const { launch_success, launch_year, land_success } = this.state;
        let url;

        // launch_success, land_success, launch_year
        url = (launch_success === '' || launch_success === undefined) && (land_success === '' || land_success === undefined) && (launch_year === '' || launch_year === undefined) ? globalVariable.baseURL :
            (land_success === '' || land_success === undefined) && (launch_year === '' || launch_year === undefined) ?
                globalVariable.baseURL + '&launch_success=' + launch_success :
                (launch_success === '' || launch_success === undefined) && (land_success === '' || land_success === undefined) ?
                    globalVariable.baseURL + '&launch_year=' + launch_year :
                    (launch_success === '' || launch_success === undefined) && (launch_year === '' || launch_year === undefined) ?
                        globalVariable.baseURL + '&land_success=' + land_success :
                        (launch_year === '' || launch_year === undefined) ?
                            globalVariable.baseURL + '&launch_success=' + launch_success + '&land_success=' + land_success :
                            (land_success === '' || land_success === undefined) ?
                                globalVariable.baseURL + '&launch_success=' + launch_success + '&launch_year=' + launch_year :
                                (launch_success === '' || launch_success === undefined) ?
                                    globalVariable.baseURL + '&land_success=' + land_success + '&launch_year=' + launch_year :
                                    globalVariable.baseURL + '&launch_success=' + launch_success + '&land_success=' + land_success + '&launch_year=' + launch_year;
        return fetch(url, { method: 'GET' })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                LaunchData: data,
                loading: false
            })
            return data;
        })
        .catch((error) => {
            this.setState({ loading: false })
        });
    }

    render() {
        const launchYearData = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
        const successfulLaunchData = ['true', 'false'];
        const successfulLandData = ['true', 'false'];

        return (
            <div className="main">
                <Row>
                    <Col xl={2} lg={4} md={4}>
                        <div className="widget-content filter_launch_success_wrapper first-column">
                            <div className="filters-text" aria-label="Select Filters">Filters</div>
                            <div className="type_of_filter" aria-label="Select filter launch year">Launch Year</div>
                            <Row className="filter-block">
                                {launchYearData.map((launch_year, i) => (
                                    <Col xl={6} lg={6} md={6} xs={6} key={i}>
                                        <div className="filter-button">
                                            <div className="radioPad">
                                                <label
                                                    tabIndex="0"
                                                    className={
                                                        this.state.launch_year === launch_year ?
                                                            'radioPad__wrapper radioPad__wrapper--selected' :
                                                            'radioPad__wrapper'
                                                    }
                                                >
                                                    <input
                                                        className="radio-icon"
                                                        type="radio"
                                                        name="launch_year"
                                                        id={launch_year}
                                                        value={launch_year}
                                                        onChange={this.handleChange.bind(this)}
                                                    />
                                                    {launch_year}
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <div className="type_of_filter" aria-label="Select filter successful launch">Successful Launch</div>
                            <Row className="filter-block">
                                {successfulLaunchData.map((launch_success, i) => (
                                    <Col xl={6} lg={6} md={6} xs={6} key={i}>
                                        <div className="filter-button">
                                            <div className="radioPad">
                                                <label
                                                    tabIndex="0"
                                                    className={
                                                        this.state.launch_success === launch_success ?
                                                            'radioPad__wrapper radioPad__wrapper--selected' :
                                                            'radioPad__wrapper'
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        className="radio-icon"
                                                        name="launch_success"
                                                        id={launch_success}
                                                        value={launch_success}
                                                        onChange={this.handleChange.bind(this)}
                                                    />
                                                    {launch_success}
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            <div className="type_of_filter" aria-label="Select filter successful land">Successful Landing</div>
                            <Row className="filter-block">
                                {successfulLandData.map((land_success, i) => (
                                    <Col xl={6} lg={6} md={6} xs={6} key={i}>
                                        <div className="filter-button">
                                            <div className="radio-filter">
                                                <label
                                                    tabIndex="0"
                                                    className={
                                                        this.state.land_success === land_success ?
                                                            'radioPad__wrapper radioPad__wrapper--selected' :
                                                            'radioPad__wrapper '
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name="land_success"
                                                        className="radio-icon"
                                                        id={land_success}
                                                        value={land_success}
                                                        onChange={this.handleChange.bind(this)}
                                                    />
                                                    {land_success}
                                                </label>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                    <Col xl={8} lg={8} md={8}>
                        <Row className="second-column">
                            {this.state.loading ? (
                                <div className="fullScreenSpinner"><PageSpinner /></div>) : false}
                            <div className="gallery-grid">{this.state.LaunchData.length > 0 ?
                                this.state.LaunchData.map((obj, i) => {
                                    return (
                                        <div className="space-details" tabIndex="0" key={i}>
                                            <img src={obj.links.mission_patch_small} alt={obj.mission_name}></img>
                                            <div className="product-bottom">
                                                <div className="image-details">
                                                    <span className="image-text flight-name">{obj.mission_name} #{obj.flight_number}</span>
                                                </div>
                                                <div className="">
                                                    <div className="image-text">Mission Ids </div>
                                                    <div>
                                                        {obj.mission_id.length > 0 ? obj.mission_id.map((value, index) => {
                                                            return <li key={index}>{value}</li>
                                                        }) : '---'}
                                                    </div>
                                                </div>
                                                <div className="image-details">
                                                    <div className="image-text">Launch Year</div>
                                                    <span>{obj.launch_year}</span>
                                                </div>
                                                <div className="image-details">
                                                    <div className="image-text">Successful <br /> Launch</div>
                                                    <span>{obj.launch_success === true ? 'true' : 'false'}</span>
                                                </div>
                                                <div className="image-details">
                                                    <div className="image-text">Successful <br /> Landing</div>
                                                    <span>{obj.rocket.first_stage.cores[0].land_success === true ? 'true' : 'false'}</span>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    )
                                }) : <span>No Data to show</span>}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}