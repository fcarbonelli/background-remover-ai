import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <a href="https://replicate.delivery/pbxt/gzlc3YFivFLzGV1QbIIWds4J8EQp1nuXH6TaVHYx68g9UlTE/green-screen.mp4" download target="_blank">
        Download File
      </a>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
