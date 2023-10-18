import React from 'react';
import ReactDOM from 'react-dom/client';
import {Helmet} from 'react-helmet';
import './index.css';
import {ReactComponent as ICON_CLOUDARROWUP_SMALL} from './assets/icons/cloud-arrow-up-fill.svg'

class Base64 extends React.Component {
  ICON_ARROWDOWN_SMALL = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>`

  constructor(props) {
    super(props)
    this.selectImage = this.selectImage.bind(this)
    this.dragFile = this.dragFile.bind(this)
    this.dropImage = this.dropImage.bind(this)
  }

  selectImage() {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.click()
    fileInput.onchange = () => {
      const viewResult = document.getElementById('viewResult')
      for(let i = 0; i < fileInput.files.length; i++) {
        viewResult.appendChild(this.createListItem(fileInput.files[i]))
        console.log(fileInput.files[i])
      }
    }
  }

  dragFile(ev) {
    ev.preventDefault()
  }

  dropImage(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (ev.dataTransfer.items) {
      const viewResult = document.getElementById('viewResult')
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        let data = ev.dataTransfer.items[i]
        if (data.kind === 'file') {
          const file = data.getAsFile()
          viewResult.appendChild(this.createListItem(file))
        }
      }
    }
  }

  createListItem(fileData) {
    // initialize the nodes
    const previewImage = document.createElement('div')
    const heading6_1 = document.createElement('h6')
    const caption_1 = document.createElement('p')
    const btnIcon_1 = document.createElement('div')
    const btnText_1 = document.createElement('div')
    const btnText_2 = document.createElement('div')
    const hr_1 = document.createElement('hr')
    const previewCode = document.createElement('div')
    const container = document.createElement('div')
    const row_1 = document.createElement('div')
    const row_2 = document.createElement('div')
    const column_1 = document.createElement('div')
    const column_2 = document.createElement('div')
    const image = new Image()
    // customize the contents
    heading6_1.textContent = fileData.name
    btnIcon_1.innerHTML = this.ICON_ARROWDOWN_SMALL
    btnText_1.innerText = `Copy to Clipboard`
    btnText_2.innerText = `Download File`
    previewCode.contentEditable = true
    // customize the class names
    row_1.classList.add('row')
    row_2.classList.add('actions')
    column_1.classList.add('column')
    column_2.classList.add('column')
    container.classList.add('column')
    container.classList.add('item-result')
    previewImage.classList.add('preview-image')
    btnIcon_1.classList.add('btn-icon')
    btnText_1.classList.add('btn-text')
    btnText_2.classList.add('btn-text')
    previewCode.classList.add('preview-code')
    caption_1.classList.add('caption')
    caption_1.classList.add('primary')
    // process the image data
    this.processImageToDisplay(fileData, (result) => {
      previewImage.style.backgroundImage = `url(${result})`
      previewCode.innerHTML = `<p>${result}</p>`
      image.src = result
      image.onload = () => {
        let stringLength = result.length - 'data:image/png;base64,'.length;
        let sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
        let totalSize = 0
        if (sizeInBytes > 1000000) {
          totalSize = `${Math.round((sizeInBytes/1000000) * 100) / 100}Mb`
        } else if (sizeInBytes > 1000) {
          totalSize = `${Math.round((sizeInBytes/1000) * 100) / 100}Kb`
        } else {
          totalSize = `${Math.round((sizeInBytes/1) * 100) / 100}B`
        }
        caption_1.textContent = `${image.width}x${image.height} • ${totalSize} • ${fileData.type.split('/')[1].toUpperCase()}`
      }
    })
    // append the nodes
    column_1.appendChild(heading6_1)
    column_1.appendChild(caption_1)
    row_1.appendChild(previewImage)
    row_1.appendChild(column_1)
    row_1.appendChild(btnIcon_1)
    row_2.appendChild(btnText_1)
    row_2.appendChild(btnText_2)
    column_2.appendChild(previewCode)
    column_2.appendChild(row_2)
    container.appendChild(row_1)
    container.appendChild(hr_1)
    container.appendChild(column_2)
    // add event listeners
    btnIcon_1.onclick = () => {
      if (container.offsetHeight === 88) {
        container.style.maxHeight = `400px`
        btnIcon_1.style.transform = 'rotate(180deg)'
      } else {
        container.style.maxHeight = '88px'
        btnIcon_1.style.transform = 'rotate(0deg)'
      }
    }
    btnText_1.onclick = () => {
      navigator.clipboard.writeText(previewCode.innerText)
    }
    btnText_2.onclick = () => {
      const textFile = document.createElement('a')
      textFile.download = `${heading6_1.innerText}.txt`
      textFile.href = `data:text/plain;charset=utf-11,${previewCode.innerText}`
      textFile.click()
    }
    btnIcon_1.click()
    // return the overall output
    return container
  }

  processImageToDisplay(file, callback) {
    const reader = new FileReader()
    reader.onload = (ev) => { callback(ev.target.result) }
    reader.readAsDataURL(file)
  }

  render() {
    return(
      <div className='column' id='view'>
        <Helmet>
          <title>Base64 Image Converter - Algerico</title>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="title" content="Base64 Image Converter - Algerico" />
          <meta name="description" content="Base64 Image Converter effortlessly transforms images into base64-encoded strings for seamless integration into web applications and development projects." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://base64-algerico.web.app/" />
          <meta property="og:title" content="Base64 Image Converter - Algerico" />
          <meta property="og:description" content="Base64 Image Converter effortlessly transforms images into base64-encoded strings for seamless integration into web applications and development projects." />
          <meta property="og:image" content="https://i.ibb.co/QpdZ87B/Frame-17.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://base64-algerico.web.app/" />
          <meta property="twitter:title" content="Base64 Image Converter - Algerico" />
          <meta property="twitter:description" content="Base64 Image Converter effortlessly transforms images into base64-encoded strings for seamless integration into web applications and development projects." />
          <meta property="twitter:image" content="https://i.ibb.co/QpdZ87B/Frame-17.png" />
        </Helmet>
        <div className='column'>
          <h1>Base<span className='primary'>64</span></h1>
          <p>Convert images to base64</p>
        </div>
        <div className='column'>
          <div className='column'>
            <div className='column' id='viewDropzone' onDragOver={this.dragFile} onDrop={this.dropImage}>
              <div className='icon-large'>
                <ICON_CLOUDARROWUP_SMALL />
              </div>
              <h4>Drop any images</h4>
              <p>or <span className='primary underline bold' onClick={this.selectImage}>browse files</span> on your computer</p>
            </div>
            <p className='caption'>Image upload limit is limited to <span className='primary bold'>5Mb</span></p>
          </div>
          <div className='column' id='viewResult'></div>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Base64 />
  </React.StrictMode>
);
