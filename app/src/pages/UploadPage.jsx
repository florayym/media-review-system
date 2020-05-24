import React, { useState } from 'react';
import styled from 'styled-components';
import { NavBar } from '../components';
import Upload from '../components/upload/Upload';
// import { PDFReader } from 'react-read-pdf';

const Noselect = styled.div`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Edge, Opera and Firefox */
`

export default function UploadPage() {

  return (
    <div>
      {/* <NavBar /> */}
      <Upload />



      {/* const [state, setState] = useState('1.0');

      const handleChange = this.handleChange.bind(this);
      const handleSubmit = this.handleSubmit.bind(this);

      handleChange(event) {
              this.setState({ value: event.target.value });
      }

      handleSubmit(event) {
              alert('文件上传码率：' + this.state.value);
      event.preventDefault();
      }

      <div className="line">选择一个媒体资源（最大500 MB）：</div>
      <form>
        <input type="file" name="media_upload" />
        <br></br><br></br>
        <label >
          选择码率
                    <select value={this.state.value} onChange={this.handleChange}>
            <option value="gg">964</option>
            <option value="rn">1800</option>
            <option value="tb">3500</option>
            <option value="fb">3856</option>
          </select>
                        bps
                    </label>
        <input type="submit" value="上传" />
        <input type="submit" value="暂停" />

        <div class="line" id="result">Uploading, please wait a moment... 64%</div>
      </form>

      <iframe title="upload files" src='http://localhost:3006/filename' width='100%' height='100%' scrolling='yes' seamless></iframe>

      <Noselect>
        <p>Hi can you select me?</p>
        <embed src="./media/pdftest.pdf#toolbar=0&zoom=85&scrollbar=0&navpanes=0" type="application/pdf" width="50%" height="600px" />
      </Noselect> */}

    </div>
  );
}