import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'

// import ReactQuill and its css
const ReactQuill = dynamic(() => import('react-quill'), {ssr:false})
// import '../../node_modules/react-quill/dist/quil.snow.css'

const BlogCreate = ({router}) => {


  const blogFromLS = () => {
    if(!process.browser){
      return false
    }else {
      if(localStorage.getItem('blog')){
        return JSON.parse(localStorage.getItem('blog'))
      }else {
        return false
      }
    }
    
  }

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const [body, setBody] = useState(blogFromLS())
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  })

  const { error, sizeError, success, formData, title, hidePublishButton } = values

  useEffect(() => {
    setValues({...values, formData: new FormData()})
    initCategories()
    initTags()
  },[router])

  const initCategories = () => {
    getCategories().then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setCategories(data)
      }
    })
  }

  const initTags = () => {
    getTags().then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      } else {
        setTags(data)
      }
    })
  }

  const showCategories = () => {
    return (
      categories && categories.map(category => (
        <li className='list-none text-xl ml-3' key={category._id}>
          <input className='mr-2' type='checkbox'/>
          <label>{category.name}</label>
        </li>
      ))
    )
  }

  const showTags = () => {
    return (
      tags && tags.map(tag => (
        <li className='list-none text-xl ml-3' key={tag._id}>
          <input className='mr-2' type='checkbox'/>
          <label>{tag.name}</label>
        </li>
      ))
    )
  }

  const publishBlog = (e) => {
    e.preventDefault()
    console.log('Blog ready for publish')
  }

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({...values, [name]: value, formData, error: ''})
  }

  const handleBody = e => {
    setBody(e)
    formData.set('body', e)
    if(process.browser) {
      localStorage.setItem('blog', JSON.stringify(e))
    }
  }

  const createBlogForm  = () => {
    return (
      <form onSubmit={publishBlog}>

        <div>
          <label className='text-xl'>Title</label>
          <input className='w-full my-2 6 h-12 border-2 border-gray-300' type='text' value={title} onChange={handleChange('title')}/>
        </div>

        <div className='mt-2'>
          <ReactQuill modules={BlogCreate.modules} formats={BlogCreate.formats} value={body} placeholder='Blog content goes here...' onChange={handleBody} />
        </div>

        <div>
          <button className='text-xl mt-6 hover:bg-gray-100 rounded-md h-12 hover:text-blue-500 border hover:border-blue-500 bg-blue-500 text-white' type='submit'>Publish</button>
        </div>

      </form>
    )
  }

  return (
    <div>
      <div className='grid grid-cols-[7fr_3fr] gap-16'>
        <div>
          {createBlogForm()}
          <hr />
          {JSON.stringify(categories)}
          <hr />
          {JSON.stringify(tags)}
        </div>
        <div>
          <h5 className='text-xl font-bold border-b-2 py-2 mb-4'>Categories</h5>
          <div className=''>
            {showCategories()}
          </div>
          <h5 className='text-xl font-bold border-b-2 py-2 mb-4 mt-4'>Tags</h5>
          <div className=''>
            {showTags()}
          </div>
        </div>
      </div>
    </div>
  )
}

BlogCreate.modules = {
  toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
  ]
};

BlogCreate.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(BlogCreate)
