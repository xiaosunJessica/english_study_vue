import request from "./request"

// 获取tab book
export const getTabsList = () => {
  return request({
    url: "/ApicorpusFly/list",
    method: "get",
  })
}
// 获取unit
export const getCorpusList = (params: { book_id?: number }) => {
  return request({
    url: "/ApicorpusFly/fullList",
    method: "get",
    params,
  })
}

// 获取word
export const getCorpusItem = (params: {
  book_id?: number
  unit_id?: number
  lesson_id?: number
}) => {
  return request({
    url: "/ApicorpusFly/fullItem",
    method: "get",
    params,
  })
}

export const setErrorWord = (params: {
  book_id?: number
  unit_id?: number
  lesson_id?: strnumbering
  errorWords: { [key: string]: string }
}) => {
  return request({
    url: "/ApicorpusFly/setErrorWord",
    method: "post",
    data: params,
  })
}
