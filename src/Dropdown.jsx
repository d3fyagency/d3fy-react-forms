import React from 'react';
import classNames from 'classnames';

class DropdownOption extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({selected: true});
    this.props.onChange(this);
  }

  render(){
    let classes = classNames(_.extend({
      'dropdown-option': true,
      'selected': this.state.selected
    }, this.props.additionalClasses));

    return (
        <li className={classes} onClick={this.handleClick} style={this.props.style}>{this.props.label}</li>
    );
  }
}

class Dropdown extends React.Component {
  defaultText(){
    return  'Select an option';
  }

  componentDidMount(){
    if(!!this.mainContainer) {
      $('body').on('click', (e) => {
        if (!this.mainContainer.contains(e.target)) {
          this.setState({open: false});
        }
      });
    }
  }

  constructor(props){
    super(props);

    let selectedText = !!this.props.placeholder ? this.props.placeholder : this.defaultText();

    if(!!this.props.value){
      selectedText = this.props.options[this.props.value].label;
    }

    this.state = {
      value: this.props.value ? this.props.value : 0,
      open: false,
      text: selectedText
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSelectionChange(e){
    this.setState({value: e.props.value}, () => {
      this.value = e.props.value;
      this.setState({text: e.props.label});
      this.setState({open: false});

      if(!!this.props.onChange) {
        this.props.onChange({target: this, selectedOption: e});
      }
    });
  }

  handleToggle(e){
    this.setState({open: !this.state.open});
  }

  render() {
    let classes = classNames({
      'custom-dropdown': true,
      'open': this.state.open
    });
    let defaultLabel = !!this.props.placeholder ? this.props.placeholder : this.defaultText();
    let options = {
      0: <DropdownOption label={defaultLabel} value={0} additionalClasses={{'default-option': true}} onChange={this.handleSelectionChange} key={0} />
    };

    _.values(this.props.options).forEach((option) => {
      options[option.value] = <DropdownOption label={option.label} value={option.value} style={option.style} onChange={this.handleSelectionChange} key={option.key} data={option.originalData}/>;
    });

    return (
        <div className={classes} onClick={this.handleToggle} ref={(el) => {this.mainContainer = el}} style={this.props.style}>
          <div className="selection-container" ref={(el) => {this.selectionContainer = el}}>
            {this.state.text}
          </div>
          <ul>
            {_.values(options)}
          </ul>
        </div>
    );
  }
}

export default Dropdown;
