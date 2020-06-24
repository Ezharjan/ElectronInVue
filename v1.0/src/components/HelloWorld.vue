<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button id="should-read-as-text" @click="textChanger()">{{readTypeMsg}}</button>
        <button id="read-file-in-nodejs" @click="ReadLocalFileInNodeJS()">Read Local File</button>
        <button id="write-file-in-nodejs" @click="WriteLocalFileInNodeJS()">Write Local File</button>
        <button id="db-insert" @click="InsertInfo()">Insert A Name</button>
        <button id="db-find" @click="FindInfo()">Find A Name</button>
        <button id="cleint-connect" @click="Connect2Server()">Connect</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { remote } from "electron";

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;

    private db = remote.getGlobal("myDB"); //这里的名称一定要写对!
    private client = remote.getGlobal("myClient"); //这里的名称一定要写对!

    readTypeMsg = "Text Changed";
    shouldChangeText = false;

    created() {
        // 何か処理
    }

    mounted() {
        // 何か処理
    }

    updated() {
        // 何か処理
    }

    destroyed() {
        // 何か処理
    }

    initialize(): void {
        this.shouldChangeText = false;
    }

    textChanger(): void {
        this.shouldChangeText = !this.shouldChangeText;
        console.log(this.shouldChangeText);
        (this.shouldChangeText && (this.readTypeMsg = "Change Text")) ||
            (this.readTypeMsg = "Text Changed");
    }

    ReadLocalFile(): void {
        console.log("not supported yet!");
    }

    ReadLocalFileInNodeJS(): void {
        // //Using 'readFile' is not recomended here, use 'readFileSync' instead
        try {
            console.log(readFileSync("D:/myText.txt"));
        } catch (err) {
            console.log(
                "Please place a myText.txt file in disk-D or revise the code above"
            );
        }
    }

    WriteLocalFileInNodeJS(): void {
        //Using 'writeFile' is not recomended here, use 'writeFileSync' instead
        writeFileSync("D:/test.txt", "This is a testing file.");
    }

    InsertInfo(): void {
        alert("Are you sure to insert?");
        this.DBOperation(0);
    }

    FindInfo(): void {
        console.log("Find the names...");
        this.DBOperation(1);
    }

    DBOperation(
        insertOrFind = 0,
        nameToInsert = "Alexander",
        ageToInsert = 25,
        rankToInsert = 1
    ) {
        //Create the database in the main process --- background.js

        if (insertOrFind === 0) {
            this.db.insert(
                {
                    name: nameToInsert,
                    age: ageToInsert,
                    rank: rankToInsert
                },
                function(err: any, doc: any) {
                    console.log("inserted:", doc);
                }
            );
        } else {
            this.db.find(
                {
                    name: nameToInsert
                },
                function(err: any, docs: any) {
                    console.log(nameToInsert + " found:", docs);
                }
            );
        }
    }

    Connect2Server() {
        /* 设置连接的服务器 */
        this.client.connect(4000, "127.0.0.1", () => {
            console.log(" Alexander--- connected to the server. \n");

            /* 向服务器发送数据 */
            this.client.write("I am a client. \n");
        });

        /* 监听服务器传来的data数据 */
        this.client.on("data", function(data: any) {
            console.log(
                "\n Alexander: the data from server is " + data.toString()
            );
        });

        /* 监听end事件 */
        this.client.on("end", function() {
            console.log("\n Alexander: data ended. ");
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
