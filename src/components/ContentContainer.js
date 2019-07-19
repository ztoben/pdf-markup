import React, { Component } from 'react';
import ContentPresentational from './ContentPresentational';
import renderPdf from '../utils/renderPdf';
import {DEFAULT} from '../constants';

export default class ContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: false,
      zoom: 1,
      pages: undefined,
      currentPage: 1,
      canvases: [],
      selectedTool: DEFAULT
    };

    this.pdfsRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {acceptedFiles: prevAcceptedFiles} = prevState;
    const {acceptedFiles: currAcceptedFiles} = this.state;

    if (currAcceptedFiles && (prevAcceptedFiles !== currAcceptedFiles)) {
      renderPdf({
        pdfsRef: this.pdfsRef,
        setPages: this.setPages,
        acceptedFiles: currAcceptedFiles,
        setCanvases: this.setCanvases
      });
    }
  }

  setAcceptedFiles = acceptedFiles => this.setState({acceptedFiles});
  setZoom = zoom => this.setState({zoom});
  setPages = pages => this.setState({pages});
  setCanvases = canvases => this.setState({canvases});
  setCurrentPage = currentPage => this.setState({currentPage});
  setSelectedTool = selectedTool => this.setState({selectedTool});

  render() {
    const {
      currentPage,
      zoom,
      acceptedFiles,
      pages,
      canvases,
      selectedTool
    } = this.state;

    return (
      <ContentPresentational
        currentPage={currentPage}
        zoom={zoom}
        acceptedFiles={acceptedFiles}
        pages={pages}
        canvases={canvases}
        selectedTool={selectedTool}
        setAcceptedFiles={this.setAcceptedFiles}
        setCanvases={this.setCanvases}
        setCurrentPage={this.setCurrentPage}
        setPages={this.setPages}
        setZoom={this.setZoom}
        setSelectedTool={this.setSelectedTool}
        pdfsRef={this.pdfsRef}
      />
    );
  }
}
