import React, { Component } from 'react';
import ContentPresentational from './ContentPresentational';
import renderPdf from '../utils/renderPdf';

export default class ContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptedFiles: false,
      zoom: 1,
      pages: undefined,
      currentPage: 1
    };

    this.pdfsRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {acceptedFiles: prevFiles} = prevState;
    const {acceptedFiles: currFiles} = this.state;

    if (currFiles && (prevFiles !== currFiles)) {
      renderPdf({pdfsRef: this.pdfsRef, setPages: this.setPages, acceptedFiles: currFiles})
    }
  }

  setAcceptedFiles = acceptedFiles => this.setState({acceptedFiles});
  setZoom = zoom => this.setState({zoom});
  setPages = pages => this.setState({pages});
  setCurrentPage = currentPage => this.setState({currentPage});

  render() {
    const {
      currentPage,
      zoom,
      acceptedFiles,
      pages
    } = this.state;

    return (
      <ContentPresentational
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
