import React from 'react';
import classNames from 'classnames';

class Checkbox extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      checked: !!props.checkedStatus
    }
  }

  _onChange = (e) => {
    this.setState({checked: $(e.target).prop('checked')});

    if (!!this.props.changeHandler) {
      this.props.changeHandler(this.props.value);
    }
  }

  render() {
    var checkLabel = this.props.checkLabel ? 
                      <span className="check-label">{this.props.checkLabel}</span> : 
                      false;

    var classes = classNames({
      'css3-checkbox': true,
      'checked': this.state.checked
    });

    return (
        <div className={classes}>
            <label className="form-check-inline">
              <input type="checkbox" className={this.props.className}
                name={this.props.name}
                value={this.props.value}
                onChange={this._onChange}
                checked={this.state.checked} />
              <i className="fa fa-check"></i>
              {checkLabel}
           </label>
          </div>
    );
  }
}

export default Checkbox;
