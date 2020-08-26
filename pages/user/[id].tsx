import Link from 'next/link'

import Layout from '../../components/Layout'
import {GetStaticPaths, GetStaticProps} from 'next';
import {User} from '../../interfaces';
import axios from '../../utils/axios';

interface Props {
    user: User,
    errorMessage?: string
}

const UserDetailsPage = ({user, errorMessage}: Props) => {
    if (!user) {
        return (
            <Layout title="Error | Next.js + TypeScript Example">
                <h1>User Details</h1>
                <p>User details not found for this user</p>
                <p>{errorMessage}</p>
                <p>
                    <Link href="/">
                        <a>Go home</a>
                    </Link>
                </p>
            </Layout>
        )
    }
    return (
        <Layout title="User Details | Next.js + TypeScript Example">
            <h1>User Details</h1>
            <p>This is the User Details page</p>

            <p>User's name: {user.name}</p>

            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    let users = await axios.get('/users').then(response => response.data)
    const paths = users.map((user: User) => ({
        params: {id: user.id.toString()},
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const id = params?.id
        let user = await axios.get(`/users/${id}`).then(response => response.data);
        return {
            props: {
                user
            }
        }
    } catch (err) {
        return {
            props: {
                errorMessage: err.message
            }
        }
    }
}

export default UserDetailsPage