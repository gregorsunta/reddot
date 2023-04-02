const FeedPanel = ({ post }) => {
  return (
    <div className={`panel`}>
      <div>
        <p>{post.owner}</p>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export { FeedPanel };
