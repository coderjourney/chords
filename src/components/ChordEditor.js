import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';

class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Type some lyrics here' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getChordMarkup() {
    var formatter = new ChordSheetJS.HtmlFormatter(),
      parser = new ChordSheetJS.ChordProParser(),
      song = parser.parse(this.state.value);

    return { __html: formatter.format(song) };
  }

  render() {
    return (
      <div className="chord-editor">
        <div className="panel">
          <h3>Input</h3>
          <textarea
            style={{width: "100%", height: "100%"}}
            onChange={this.handleChange}
            defaultValue={this.state.value}/>
        </div>
        <div className="panel">
          <h3>Output</h3>
          <div
            style={{width: "100%", height: "100%", fontFamily: "monospace"}}
            className="chord-output"
            dangerouslySetInnerHTML={this.getChordMarkup()}/>
        </div>
      </div>
    );
  }
}

export default ChordEditor;
