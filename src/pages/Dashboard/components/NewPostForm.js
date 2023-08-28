import '../../../styles/dashboard.css'
import UserBanner from "../../../components/UserBanner";
import { useContext, useState } from 'react';
import DataContext from '../../../DataContext';

function InputFields({ value, handleChange }) {
  return (
    <textarea
      name='newPost'
      value={value}
      onChange={handleChange}
      className='post-input'
      placeholder="What's on your mind?"
    ></textarea>
  )
}

function SubmitPostButton() {
  return (
    <button type='submit' className='post-button'>
      Post
    </button>
  )
}

export default function NewPostForm() {
  const [formData, setFormData] = useState('')
  const { user } = useContext(DataContext)

  const handleChange = event => setFormData(event.target.value)

  const handleSumbit = (event) => {
    event.preventDefault()
    const [title, body] = formData.split('\n\n')
    console.log('title:', title)
    console.log('body:', body)
    setFormData('')

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: user.id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      ;
  }

  return (
    <form
      onSubmit={handleSumbit}
      className='new-post-form box-container box-container-white'
    >
      <UserBanner name={user.name} />
      <InputFields value={formData} handleChange={handleChange} />
      <SubmitPostButton />
    </form>
  )
}