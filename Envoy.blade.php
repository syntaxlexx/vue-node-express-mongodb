{{-- digitalocean, scaleway, aws --}}
@servers(['web' => "$user@$ip", 'local' => '127.0.0.1'])

@setup
    $userName = 'lexx';
    $groupName = 'lexx';
    $projects = [];

    function getSystemUser()
    {
        if (\Illuminate\Support\Str::contains(strtolower(php_uname()), 'windows')) {
            return getenv('USERNAME');
        }

        return posix_getpwuid(posix_geteuid())['name'];
    }

    $systemUser = getSystemUser();

    $projectA = [
        'name'              => 'VueMongo Demo Server',
        'repository'        => 'git@github.com:lexxyungcarter/vue-node-express-mongodb.git',
        'app_dir'           => '/mnt/data/www/vuemongo',
        'app_live_dir'      => 'app',
        'app_node_dir'      => 'app/nodejs-express-mongodb',
        'script_file'        => 'server.js',
        'type'              => 'node', // either node or frontend
    ];

    array_push($projects, $projectA); // Vuemongo Demo Server

    $projectsToString = implode(", ", array_column($projects, 'name'));

@endsetup

@story('update')
    git_pull
    run_housekeeping
@endstory

@story('list')
    list_web
@endstory

@task('git_pull', ['on' => 'web'])

    @if(count($projects) > 0)

        @foreach($projects as $item)
            echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
            echo 'Project: {{ $item['name'] }}'
            echo '------------------------------------------'

            cd {{ $item['app_dir'] }}
            cd {{ $item['app_live_dir'] }}
            pwd

            echo 'Running Git Pull on the Project'
            @if($branch)
                echo '{{ $branch }} specified.'
                echo 'Running git checkout before pulling.'
                git checkout {{ $branch }}
                echo 'Running git pull now'
                git pull
            @else
                echo 'No branch specified, Git pulling the current branch. (Branch can be specified via --branch)'
                git pull
            @endif

        @endforeach

    @endif

@endtask

@task('run_housekeeping', ['on' => 'web', 'confirm' => true])

    @if(count($projects) > 0)

        @foreach($projects as $item)
            @if($item['type'] == "node")
                echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
                echo 'Project: {{ $item['name'] }}'
                echo '------------------------------------------'
                echo "Restarting PM2"
                cd {{ $item['app_dir'] }}
                cd {{ $item['app_node_dir'] }}
                pm2 stop {{ $item['script_file'] }}
                pm2 start {{ $item['script_file'] }}
                echo "Done!"
            @endif
        @endforeach

    @endif

@endtask
