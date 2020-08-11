export const root = [
  {
    name: '课程管理',
    datatarget: 'course-managment',
    id: 'cmr',
    icon: 'book',
    hasChildren: true,
    children: [
      {
        name: '查询课程',
        id: 'query-course',
        routerlink: 'queryCourse',
        icon: 'search',
        hasChildren: false,
      },
      {
        name: '创建课程',
        id: 'create-course',
        routerlink: 'createCourse',
        icon: 'file-add',
        hasChildren: false,
      },
      {
        name: '新建课程分类',
        id: 'new-course-category',
        routerlink: 'createCategory',
        icon: 'folder-add',
        hasChildren: false,
      },
      {
        name: '查询课程分类',
        icon: 'search',
        routerlink: 'queryCategory',
        hasChildren: false,
        id: 'query-category',
      },
    ],
  },
  {
    name: '学期管理',
    id: 'tmr',
    icon: 'appstore',
    datatarget: 'term-management',
    hasChildren: true,
    children: [
      {
        name: '学期查询',
        icon: 'search',
        routerlink: 'queryTerm',
        hasChildren: false,
        id: 'query-term',
      },
      {
        name: '新建学期',
        icon: 'appstore-add',
        id: 'new-term',
        hasChildren: false,
        routerlink: 'createTerm',
      },
    ],
  },
  {
    name: '中心管理',
    icon: 'deployment-unit',
    id: 'dm',
    datatarget: 'department-management',
    hasChildren: true,
    children: [
      {
        name: '新建中心',
        icon: 'branches',
        id: 'new-department',
        routerlink: 'createDepartment',
        hasChildren: false,
      },
      {
        name: '中心列表',
        icon: 'file-text',
        id: 'department-list',
        routerlink: 'departmentList',
        hasChildren: false,
      },
    ],
  },
  {
    name: '学生管理',
    icon: 'user',
    datatarget: 'student-management',
    id: 'sm',
    hasChildren: true,
    children: [
      {
        name: '学生查询',
        icon: 'team',
        hasChildren: false,
      },
      {
        name: '新生建档',
        icon: 'solution',
        id: 'newStudent',
        routerlink:'createNewStudent',
        hasChildren: false,
      },
    ],
  },
  {
    name:'专业管理',
    icon:'solution',
    id:'spm',
    datatarget:"speciality-managment",
    hasChildren:true,
    children:[
      {
        name:"新建专业",
        icon:'solution',
        id:'newSpeciality',
        hasChildren:false,
        routerlink:"createSpeciality"
      },
      {
        name:"专业列表",
        icon:'solution',
        id:'special-list',
        routerlink:'specialityList'
      }
    ]
  }
];
