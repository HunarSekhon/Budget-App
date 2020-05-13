import 'react-dates/initialize';
import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters'

class ExpenseListFilters extends React.Component{
    state ={
        calenderFocused: null,

    };
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));

    };
    onFocusChange = (calenderFocused) => {
        this.setState(() => ({calenderFocused: calenderFocused}));
    };
    render(){
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                        type="text" 
                        className="text-input"
                        placeholder = "Search Expenses"
                        value={this.props.filters.text} 
                        onChange={(e) => {
                            this.props.dispatch(setTextFilter(e.target.value));
                        }}/>
                    </div>
                    <div className="input-group__item">
                        <select 
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={(e) => {
                                if(e.target.value === 'date'){
                                    this.props.dispatch(sortByDate());
                                }else if(e.target.value === 'amount'){
                                    this.props.dispatch(sortByAmount());
                                }
                            }}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker 
                        startDateId={"dwjkhqkehwqjkeq"}
                        endDateId={"cxzvcxbzbczxbz"}
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateProps)(ExpenseListFilters);