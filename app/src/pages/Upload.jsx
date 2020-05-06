import React, { Component } from 'react'
import FileViewer from 'react-file-viewer'
import { PDFReader } from 'react-read-pdf';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '1.0' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('文件上传码率：' + this.state.value);
        event.preventDefault();
    }

    onError(event) {
        // report error
    }

    render() {
        return (
            <div className="navbar-brand">
                {/*
                <div class="line">选择一个媒体资源（最大500 MB）：</div>
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
                    
                    <iframe src='http://localhost:3006/filename' width='100%' height='100%' scrolling='yes' seamless></iframe>
                    
                    <FileViewer
                        fileType='pdf'//文件类型 png, jpeg, gif, bmp, including 360-degree images,   pdf csv xslx docx,   mp4 webm,   mp3
                        filePath='http://localhost:3006/pdftest.pdf' //文件地址
                        onError={this.onError.bind(this)} //函数[可选]：当文件查看器在获取或呈现请求的资源时发生错误时将调用的函数。在这里可以传递日志记录实用程序的回调。
                        errorComponent={console.log("出现错误")} //[可选]：发生错误时呈现的组件，而不是react-file-viewer随附的默认错误组件。
                        unsupportedComponent={console.log("不支持")} //[可选]：在不支持文件格式的情况下呈现的组件。
                    />*/}
                    <div style={{overflow:'scroll',height:600}}>
            <PDFReader url="http://localhost:3006/pdftest.pdf"/>
           </div>
            </div>
        );
    }
}

export default Upload