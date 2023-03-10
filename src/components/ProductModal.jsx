import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MessageContext, handleSuccessMessage, handleErrorMessage } from '../store/messageStore'

const ProductModal = ({closeProductModal, getProducts, tempProduct, type}) => {


  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
  })

  const [, dispatch] = useContext(MessageContext)

  useEffect(()=> {
    console.log(type, tempProduct)
    if (type === 'create') {
      setTempData({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
      })
    } else if (type === 'edit') {
      setTempData(tempProduct)
    }
  }, [type, tempProduct])

  const handleChange = (e) => {
    const { value, name } = e.target

    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked
      })
    } 
    else {
      setTempData({
        ...tempData,
        [name]:value
      })
    }
  }

  const submit = async () => {

    try {
      let api =  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`
      let method = 'post'

      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = 'put'
      }

      const res = await axios[method](
       api, {
          data: tempData
        }
      )
      console.log(res)
      handleSuccessMessage(dispatch, res)
      closeProductModal()
      getProducts()
    } catch (error) {
      console.log(error)
      handleErrorMessage(dispatch, error)
    }
  }

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id='productModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '????????????' : `?????? ${tempData.title}`  } 
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    ??????????????????
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='?????????????????????'
                      className='form-control'
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    ??? ????????????
                    <input
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src='' alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <pre>
                  {JSON.stringify(tempData)}
                </pre>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    ??????
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='???????????????'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      ??????
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='???????????????'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.category} 
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      ??????
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='???????????????'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.unit} 
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      ??????
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='???????????????'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.origin_price} 
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      ??????
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='???????????????'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.price} 
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    ????????????
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='?????????????????????'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description} 
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    ????????????
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='???????????????????????????'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content} 
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      ????????????
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='???????????????????????????'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={Boolean(tempData.is_enabled)} 
                        // !!?????????
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeProductModal}
            >
              ??????
            </button>
            <button type='button' className='btn btn-primary'
              onClick={submit}
            >
              ??????
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

