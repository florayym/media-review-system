import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

/**
 * 设计按钮
 */

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMedia extends Component {
  updateReviewer = event => {
    event.preventDefault()

    window.location.href = `/medias/update/${this.props.id}`
  }

  render() {
    return <Update onClick={this.updateReviewer}>Update</Update>
  }
}

class DeleteMedia extends Component {
  deleteReviewer = event => {
    event.preventDefault()

    if (
      window.confirm(
        `Do tou want to delete the media ${this.props.id} permanently?`,
      )
    ) {
      api.deleteMediaById(this.props.id)
      window.location.reload()
    }
  }

  render() {
    return <Delete onClick={this.deleteReviewer}>Delete</Delete>
  }
}

/**
 * 按钮结束
 */

class MediasList extends Component {
  // 添加一个类构造函数来初始化状态 this.state，类组件应始终使用 props 调用基础构造函数。
  constructor(props) {
    super(props)
    this.state = {
      medias: [],
      columns: [],
      isLoading: false,
    }
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllMedias().then(medias => {
      this.setState({
        medias: medias.data.data,
        isLoading: false,
      })
    })
  }

  render() {
    const { medias, isLoading } = this.state
    console.log('TCL: MediasList -> render -> medias', medias)

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true,
      },
      {
        Header: 'Item Type',
        accessor: 'item_type',
        filterable: true,
      },
      {
        Header: 'Folder Path',
        accessor: 'folder_path',
        filterable: true,
      },
      {
        Header: 'Date',
        accessor: 'date',
        filterable: true,
      },
      {
        Header: 'Size',
        accessor: 'size',
        filterable: true,
      },
      {
        Header: 'Audit',
        accessor: 'audit',
        filterable: true,
      },
      {/*
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            */},
      {
        Header: '',
        accessor: '',
        Cell: function (props) {// 按钮1
          return (
            <span>
              <DeleteMedia id={props.original._id} />
            </span>
          )
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: function (props) {// 按钮2
          return (
            <span>
              <UpdateMedia id={props.original._id} />
            </span>
          )
        },
      },
    ]

    let showTable = true
    if (!medias.length) {
      showTable = false
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={medias}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    )
  }
}

export default MediasList