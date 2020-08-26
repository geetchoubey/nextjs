import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import axios from '../../utils/axios'

const UserDetailsPage = () => {
    const { query } = useRouter()
    const fetcher = async (url: string): Promise<any> => {
        let response = await axios.get(url)
        if (response.status === 200) return response.data
    }
    console.log('Inside users')
    const {data, error} = useSWR(`/users/${query.id}`, fetcher)
    if (error) {
        return (
            <Layout title="Error | Next.js + TypeScript Example">
                <h1>User Details</h1>
                <p>User details not found for this user</p>
                <p>{error.message}</p>
                <p>
                    <Link href="/">
                        <a>Go home</a>
                    </Link>
                </p>
            </Layout>
        )
    }
    if (!data) return <h1>Loading...</h1>
    return (
        <Layout title="User Details | Next.js + TypeScript Example">
            <h1>User Details</h1>
            <p>This is the User Details page</p>

            <p>User's name: {data.name}</p>

            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </Layout>
    )
}

export default UserDetailsPage