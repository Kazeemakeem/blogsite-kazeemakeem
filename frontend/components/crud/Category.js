import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie } from '../../actions/auth'
import { createCategory, getCategories, removeCategory } from '../../actions/category'

import React from 'react'

const Category = () => {

  const [ values, setValues ] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  })

  const { name, error, success, categories, removed, reload } = values
  const token = getCookie('token')

  useEffect(() => {
    loadCategories()
  },[reload])

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error){
        console.log(data.error)
      }else {
        setValues( { ...values, categories: data})
      }
    })
  }

  const categoriesList = () => {
    return <div className='flex gap-4 text-xl'>
      {categories.map(category => {
      return <button className='mt-6 bg-gray-100 rounded-md h-12 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white'  onDoubleClick={() => confirmRemove(category.slug)} title='Doubleclick to remove from list' key={category._id} >{category.name}</button>
    })}
    </div>
  }

  const confirmRemove = slug => {
    let answer = window.confirm('Are you sure you want to remove this category')
    if(answer) deleteCategory(slug)
  }

  const deleteCategory = slug => {
      removeCategory(slug, token).then(data => {
        if(data.error){
          console.log(data.error)
        }else {
          setValues({ ...values, error: false, success: false, name: '', reload: !reload, removed: !removed})
        }
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createCategory({ name }, token).then(data => {
      setValues( data.error ? { ...values, error: data.error, success: false} : { ...values, error: false, success: true, name: '', reload: !reload})
    })
  }

  const handleChange = e => {
    setValues({ ...values, name: e.target.value, error: false, success: false, removed: ''})
  }

  const showSuccess = () => {
    if(success) return <p>Category created</p>
  }
  
  const showError = () => {
    if(error) return <p>Category already exist</p>
  }

  const showRemoved = () => {
    if(removed) return <p>Category removed</p>
  }

  const mouseMoveHandler = () => {
    setValues({ ...values, success: false, error: false, removed: ''})
  }

  const showMessage = () => success || error || removed


  const createCategoryForm = () => (
    <form className='text-xl bg-gray-100 rounded-xl py-4 px-2' onSubmit={handleSubmit}>
      <div className='px-2'>
        <label className='font-bold'>Name</label>
        <input className='ml-4 border-2 w-80 rounded-md' type='text' autoFocus onChange={handleChange} value={name} required/>
      </div>
      <div>
        <button className='mt-6 bg-blue-500 rounded-md h-12 text-white' type='submit'>Create</button>
      </div>
    </form>
  )
  return (
    <>
      {showMessage() && <div className={`mb-6 border-l-4 px-2 py-4 h-20 w-full ${success ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'} text-2xl flex items-center font-bold`}>
        {showSuccess()}
        {showError()}
        {showRemoved()}
      </div>}
      <div onMouseMove={mouseMoveHandler}>
        {createCategoryForm()}
        {categoriesList()}
      </div>
    </>
  )
}

export default Category
