import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData
            .list
            .map((weather) => {
                return weather.main.temp - 273.15;
            });
        const pressures = cityData
            .list
            .map((weather) => {
                return weather.main.pressure;
            });
        const humidities = cityData
            .list
            .map((weather) => {
                return weather.main.humidity;
            });
        const {lon, lat} = cityData.city.coord;
        

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td>
                    <Chart data={temps} color="orange" units="&deg;C"/>
                </td>
                <td>
                    <Chart data={pressures} color="red" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="black" units="%"/>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th style={{width: '25%'}}>City</th>
                        <th style={{width: '25%'}}>Temperature (K)</th>
                        <th style={{width: '25%'}}>Pressure (hPa)</th>
                        <th style={{width: '25%'}}>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this
                        .props
                        .weather
                        .map(this.renderWeather)}
                </tbody>

            </table>
        )
    }
}

function mapStateToProps({weather}) {
    return {weather};
}

export default connect(mapStateToProps)(WeatherList);