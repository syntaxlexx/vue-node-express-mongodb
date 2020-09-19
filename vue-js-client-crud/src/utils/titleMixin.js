/**
 * Created by PhpStorm.
 * User: lexxyungcarter
 * Github:  https://github.com/lexxyungcarter
 * Date: 2019-05-14
 * Time: 02:56
 */

function getTitle (vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm) + " | " + window.siteName
            : title + " | " + window.siteName
    }
}

export default {
    created () {
        const title = getTitle(this)
        if (title) {
            let prevTitle = document.title
            var notificationsCount = prevTitle.substring(
                prevTitle.lastIndexOf("(") + 1,
                prevTitle.lastIndexOf(")")
            );

            let finalTitle = ''

            if(notificationsCount)
                finalTitle = `(${notificationsCount})`

            document.title = `${finalTitle} ${title}`
        }
    }
}

 
 