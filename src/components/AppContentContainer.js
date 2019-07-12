import React, { Component } from 'react';
import AppContentPresentational from './AppContentPresentational';
import renderPdf from '../utils/renderPdf';

export default class AppContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: false,
      zoom: 1.5,
      pages: undefined,
      currentPage: 1
    };

    this.pdfsRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {acceptedFiles: prevFiles, zoom: prevZoom} = prevState;
    const {acceptedFiles: currFiles, zoom: currZoom} = this.state;

    if ((prevFiles !== currFiles || prevZoom !== currZoom) && currFiles) {
      renderPdf({pdfsRef: this.pdfsRef, zoom: currZoom, setPages: this.setPages, acceptedFiles: currFiles})
    }
  }

  setAcceptedFiles = (acceptedFiles) => this.setState({acceptedFiles});
  setZoom = (zoom) => this.setState({zoom});
  setPages = (pages) => this.setState({pages});
  setCurrentPage = (currentPage) => this.setState({currentPage});

  render() {
    const {
      currentPage,
      zoom,
      acceptedFiles,
      pages
    } = this.state;

    return (
      <AppContentPresentational
        currentPage={currentPage}
        zoom={zoom}
        acceptedFiles={acceptedFiles}
        pages={pages}
        setAcceptedFiles={this.setAcceptedFiles}
        setCurrentPage={this.setCurrentPage}
        setPages={this.setPages}
        setZoom={this.setZoom}
        pdfsRef={this.pdfsRef}
      />
    );
  }
}
