import useStore from '../stores';

const HomePage = () => {

    const { postNewUser } = useStore();

    return (
        <div>
            <h1>Smart Home Web App</h1>
            <button onClick={postNewUser}>Create User</button>
        </div>
    )
}

export default HomePage;