const Sample = ({ loadingPost, loadingUsers, post, users}) => {
    return(
        <div>
            <section>
                <h3>포스트</h3>
                {loadingPost && '로딩중....'}
                {!loadingPost && post && (
                    <div>
                        <h3>{post.title}</h3>
                        <h3>{post.body}</h3>
                    </div>
                )}
            </section>
            <hr />
            <section>
                <h3>사용자 목록</h3>
                {loadingUsers && '로딩중....'}
                {!loadingUsers && users && (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};
export default Sample;