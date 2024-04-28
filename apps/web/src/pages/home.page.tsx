export default function HomePage() {
   return (
      <main className='px-10'>
         <NoteInput />
      </main>
   )
}

function NoteInput() {
   return (
      <form className='note-input flex flex-col max-w-52 border border-black'>
         <input type='text' placeholder='title...' />
         <textarea id='' cols={30} rows={10} placeholder='description'></textarea>
         <button>create</button>
      </form>
   )
}
