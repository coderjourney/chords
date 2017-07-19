import React, { Component } from 'react';
import { Breadcrumb } from '@blueprintjs/core';
import ChordSheetJS from 'chordsheetjs';

class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const song = {...this.props.song};
    song.chordpro = event.target.value;

    this.props.updateSong(song);
  }

  getChordMarkup() {
    const formatter = new ChordSheetJS.HtmlFormatter();
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(this.props.song.chordpro);

    return { __html: formatter.format(song) };
  }

  render() {
    return (
      <div>
        <ul className="pt-breadcrumbs">
          <li><Breadcrumb href="/songs" text="Songs" /></li>
          <li><Breadcrumb href="#" text={this.props.song.title} /></li>
        </ul>
        <h2 style={{margin: "0.5em 0"}}>{this.props.song.title}</h2>
        <div className="chord-editor">
          <div className="panel">
            <h3>Input</h3>
            <textarea
              style={{width: "100%", height: "100%"}}
              onChange={this.handleChange}
              value={this.props.song.chordpro}/>
          </div>
          <div className="panel">
            <h3>Output</h3>
            <div
              style={{width: "100%", height: "100%", fontFamily: "monospace"}}
              className="chord-output"
              dangerouslySetInnerHTML={this.getChordMarkup()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ChordEditor;
