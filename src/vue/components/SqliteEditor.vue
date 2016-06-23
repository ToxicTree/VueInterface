<template>
    <div class="app__status">
        <samp class="{{ (state) ? 'bg-'+state : 'app__fade' }}">{{ status }}</samp>
    </div>
    <ol class="breadcrumb" id="apiPath">/</ol>
    <div id="buffer"></div>
</template>

<script>
	export default {
        data() {
            return {
                status: '',
                state: '',
                apiDomain: 'http://StorageAPI.dev',
                apiPath: '/',
                apiMethod: 'GET'
            }
        },
		methods: {
            navigate(path, method) {
                if (!path)
                    return;

                var self = this;

                this.apiPath = path;
                this.apiMethod = (method) ? method : 'GET';

                this.ajax();

                var content = "";
                var h = '', hierarchy = this.apiPath.split('/');

                for (var i=0 ; i<hierarchy.length ; i++){
                    if (i!=0)
                        h += '/' + hierarchy[i];

                    var n = (hierarchy[i]!='') ? hierarchy[i] : 'Root';

                    if (i==hierarchy.length-1 || this.apiPath=='/'){
                        content += "<li class='active'>"+n+"</li>";
                        break;
                    }
                    else if (i==0)
                        content += "<li class='apiPath'><a href='"+this.$root.nav+"' data-path='/'>"+n+"</a></li>";
                    else
                        content += "<li class='apiPath'><a href='"+this.$root.nav+"' data-path='"+h+"'>"+n+"</a></li>";
                }
                
                content += "<li class='pull-right'><a href='"+this.$root.nav+"' data-path='"+this.apiPath+"'>reload</a></li>";
                
                $('#apiPath').html(content);

                $('#apiPath a').click(function(){
                    self.navigate(this.getAttribute('data-path'))
                });

            },
            listTables(data){
                var content = "<table class='table'>";

                content += "<tr><th>Tables:</th></tr>";

                for (var i=0; i<data.length ; i++){
                    content += "<tr>";
                    content += "<td><a href='"+this.$root.nav+"' data-path='/"+data[i].name+"'>"+data[i].name+"</a></td>";
                    content += "</tr>";
                }

                content += "</table>";

                return content;
            },
            listRows(data){
                var content = "<table class='table'>";

                content += "<tr>";
                for (var key in data[0])
                    content += "<th>"+key+"</th>";
                content += "<th>Tools</th>";
                content += "</tr>";

                for (var i=0; i<data.length ; i++){
                    content += "<tr>";
                    for (var key in data[i]){
                        if (key=="id" && this.apiPath.lastIndexOf('/'+data[i].id) <1 )
                            content += "<td><a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"'>"+data[i].id+"</a></td>";
                        else
                            content += "<td>"+data[i][key]+"</td>";
                    }
                    content += "<td><a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-method='delete'>KILL</a></td>";
                    content += "</tr>";
                }

                content += "</table>";

                return content;
            },
            listPost(data){
                var content = "<table class='table'>";

                for (var key in data[0]){
                    content += "<tr>";
                    content += "<td>"+key+"</td>";
                    content += "<td>"+data[0][key]+"</td>";
                    content += "</tr>";
                }
                
                content += "<tr>";
                content += "<td>Tools:</td>";
                content += "<td><a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[0].id+"' data-method='delete'>KILL</a></td>";
                content += "</tr>";
                
                content += "</table>";

                return content;
            },
            handleResponse(data){
                var self = this;
                var hierarchy = this.apiPath.split('/');

                var content = 
                    (this.apiPath == '/') ? this.listTables(data) :
                    (hierarchy.length == 2) ? this.listRows(data) :
                    (hierarchy.length  > 2) ? this.listPost(data) : false;

                if (!content)
                    return;

                $('#buffer').html(content);

                $('#buffer a').click(function(){
                    self.navigate( this.getAttribute('data-path'), this.getAttribute('data-method') );
                });
            },
            ajax(){
                var self = this;
                
                // Make a request
                self.status = "Connecting to storage @ '"+self.apiDomain+"' ...";

                $.ajax({
                    url: self.apiDomain+self.apiPath,
                    async: true,
                    type: self.apiMethod,
                    success: function(response,status,xhr){
                        self.state = 'success';
                        if (self.fade)
                            clearTimeout(self.fade);
                        self.fade = setTimeout(function(){
                            self.state='';
                        },2000);
                        self.status  = "Got response from '"+self.apiDomain+"'. "+xhr.status+" "+xhr.statusText;
                        self.handleResponse(response);
                    },
                    error: function(response,status,code){
                        self.state = 'danger';
                        if (self.fade)
                            clearTimeout(self.fade);
                        self.fade = setTimeout(function(){
                            self.state='';
                        },2000);
                        self.status  = "Error from '"+self.apiDomain+"'. "+code;
                    }
                });
            }
		},
        ready(){
            this.navigate(this.apiPath);
        }
	}
</script>