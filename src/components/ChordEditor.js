import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChordSheetJS from 'chordsheetjs';

class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const song = {...this.props.item};
    song.chordpro = event.target.value;

    this.props.updateSong(song);
  }

  getChordMarkup() {
    const formatter = new ChordSheetJS.HtmlFormatter();
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(this.props.item.chordpro);

    return { __html: formatter.format(song) };
  }

  render() {
    const { item: song } = this.props

    return (
      <div>
        <ul className="pt-breadcrumbs">
          <li><Link to="/songs" className="pt-breadcrumb">Songs</Link></li>
          <li><Link to="#" className="pt-breadcrumb">{song.title}</Link></li>
        </ul>
        <h2 style={{margin: "0.5em 0"}}>{song.title}</h2>
        <div className="chord-editor">
          <div className="panel">
            <h3>Input</h3>
            <textarea
              style={{width: "100%", height: "100%"}}
              onChange={this.handleChange}
              value={song.chordpro}/>
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
