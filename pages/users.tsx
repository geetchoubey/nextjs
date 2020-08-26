import Link from 'next/link'
import Layout from '../components/Layout'
import {User} from '../interfaces';
import List from '../components/List';
import {GetStaticProps} from 'next';
import axios from '../utils/axios';

type Props = {
    users: User[]
}

const UsersPage = ({users}: Props) => (
    <Layout title="Users | Next.js + TypeScript Example">
        <h1>Users</h1>
        <p>This is the users listing page</p>

        <List items={users} />

        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
    try {
        let response = await axios.get('/users')
        let {data: users} = response
        return {
            props: {
                users
            }
        }
    } catch (err) {
        throw new Error('User not found')
    }
}

export default UsersPage