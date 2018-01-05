import TicketScheduleScene from '../scenes/TicketScheduleScene/TicketScheduleScene'
import TicketManagementScene from '../scenes/TicketManagementScene/TicketManagementScene';
import ReportScene from '../scenes/ReportScene/ReportScene';
import NotificationScene from '../scenes/NotificationScene/NotificationScene';
import MoreScene from '../scenes/MoreScene/MoreScene';
const ListTabar = [
    {
        title: 'Lịch bán vé',
        tabName: 'ticketSchedule',
        component: TicketScheduleScene,
        img: require('../images/calendar.png')
    },
    {
        title: 'Quản lý vé',
        tabName: 'ticketManagement',
        component: TicketManagementScene,
        img: require('../images/manager.png')
    },
    {
        title: 'Thống kê',
        tabName: 'report',
        component:  ReportScene,
        img: require('../images/chart.png')
    },
    {
        title: 'Thông báo',
        tabName: 'notification',
        component: NotificationScene,
        img: require('../images/noti.png'),
        badgeText: '5'
    },
    {
        title: 'Thêm',
        tabName: 'more',
        component: MoreScene,
        img: require('../images/more.png')
    },
    
]
export default ListTabar;