import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Chapter from '../views/Corpus/Chapter/Chaper.vue'
import WordList from '../views/Corpus/WordList.vue'
import StudyMode from '../views/Corpus/StudyMode.vue'
import Practice from '../views/Corpus/Practice/Practice.vue'
import Pronounce from '@/views/Pronounce/Pronounce.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/corpus/chapter',
    name: 'Chapter',
    component: Chapter
  },
  {
    path: '/corpus/wordlist',
    name: 'WordList',
    component: WordList,
  },
  {
    path: '/corpus/study',
    name: 'StudyMode',
    component: StudyMode,
  },
  {
    path: '/corpus/practice',
    name: 'Practice',
    component: Practice,
  },
  {
    path: '/Pronounce',
    name: 'pronounce',
    component: Pronounce,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router