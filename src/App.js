import React, {Component} from 'react';
import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  bold = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  debug = () => {
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    const self = this;
    stateToHTML(this.state.editorState.getCurrentContent());
    debugger;
  };

  render() {
    const {editorState} = this.state;

    return (
      <div style={{width: '80%', margin: 'auto'}}>
        <div style={{}}>
          <button onClick={this.debug}>Debug</button>
          <button onClick={this.bold}>Bold</button>
        </div>

        <div style={{marginTop: 50, border: 'solid 1px #ccc'}}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
        <div style={{marginTop: 50, border: 'solid 1px #ccc'}}>
          <textarea
            value={stateToHTML(this.state.editorState.getCurrentContent())}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
