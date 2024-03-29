interface ImageProps {
    _id?: string
    url?: string
    createdAt?: string
}

export interface ColumnProps {
    _id: string
    title: string
    avatar?: ImageProps
    description: string
}

export interface PostProps {
    id: number
    title: string
    content: string
    image?: string
    createdAt: string
    columnId: number
}

export const testData:ColumnProps[] = [
    {
     _id: '1',
     title: 'test1的专栏',
     description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
     avatar: {
        _id: 'string',
        url: 'string',
        createdAt: '2021-05-11T15:06:48.932Z'
     }
    }
]

export const postList:PostProps[] = [
    {
     id: 1,
     title: '这是我的第一篇文章',
     content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
     image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
     createdAt: '2020-06-11 10:34:22',
     columnId: 1
    },
    {
     id: 2,
     title: '这是我的第二篇文章',
     content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
     createdAt: '2020-06-11 10:34:22',
     columnId: 2
    },
    {
     id: 3,
     title: '这是我的第三篇文章',
     content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
     image: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
     createdAt: '2020-06-11 10:34:22',
     columnId: 3
    },
    {
    id: 4,
    title: '这是我的第4篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2020-06-11 10:34:22',
    columnId: 4
    }
]
