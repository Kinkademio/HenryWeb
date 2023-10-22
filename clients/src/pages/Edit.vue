<template>
  <div>
    <template v-if="allTests.length > 0">
      <q-card class="q-pa-lg" v-for="(test, index) in allTests" :key="index">
        <q-card-header>
          Тест: {{ test.taskName }}
        </q-card-header>
        <q-card-actions align="between">
          <q-btn flat color="positive" label="Редактировать" @click="editModal = true; currentEditTask = test"></q-btn>
          <q-btn flat color="negative" label="Удалить" @click="deleteTest(test._id)"></q-btn>
        </q-card-actions>
      </q-card>
    </template>
    <q-card class="q-pa-lg" v-else>
      <div class="text-h6"> У вас еще нет тестов!</div>
    </q-card>
    <q-dialog v-model="dialog" persistent :maximized="editModal" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">Редактирование задания</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-card>
            <q-card-section>
              <q-input v-model="currentEditTask.taskName" label="Название теста"></q-input>
            </q-card-section>
            <q-card-separator></q-card-separator>
            <q-card-section>
              <q-card class="q-ma-md task" v-for="(one, i) in currentEditTask.tasks" :key="one">
                <q-card-section class="text-h6">
                  Задание {{ i + 1 }}
                  <q-btn flat color="negative" icon="delete" @click="deleteTask(i)"></q-btn>
                </q-card-section>
                <q-card-section>
                  <q-input label="Введите текст задания" v-model="one.text"></q-input>
                </q-card-section>
                <q-card-separator></q-card-separator>

                <q-card-section>
                  <q-card class="q-ma-md ansver" v-for="(ans, j) in one.ansvers" :key="j">
                    <q-card-section class="text-h7">
                      Ответ: {{ j + 1 }}
                      <q-btn flat color="negative" icon="delete" @click="deleteAns(one.ansvers, j)"></q-btn>
                    </q-card-section>

                    <q-separator></q-separator>

                    <q-card-section>
                      <q-input label="Текст ответа" v-model="ans.text"></q-input>
                      <q-checkbox label="Ответ является верным" v-model="ans.right"
                        @click="makeOnlyOneRight(one.ansvers, j)"></q-checkbox>
                    </q-card-section>

                  </q-card>
                  <q-btn flat color="positive" label="Добавить ответ" icon="add" @click="addAnsver(one.ansvers)"></q-btn>
                </q-card-section>
              </q-card>
              <q-btn flat label="Добавить задание" color="positive" icon="add" @click="addTask"></q-btn>
            </q-card-section>
            <q-card-actions align="between">
              <q-btn label="Сохранить" color="positive" @click="saveTest"></q-btn>
              <q-btn label="Очистить" color="negative" @click="clearAll"></q-btn>
            </q-card-actions>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { api } from "../boot/axios";
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      allTests: [],
      editModal: false,
      currentEditTask: null,
    };
  },
  mounted() {

  },
  methods: {
    async getAllTests() {
      const res = await api.get(
        "api/test",
        {
          headers: {
            "x-requested-with": "*",
          }
        }
      );
      if (res) {
        this.allTests = res;
      }
    },
    deleteTest(id) {
      api.delete({
        _id: id
      });
      this.getAllTests();
    },
    addTask(){
      let clone = {
        text: '',
        ansvers: []
      };
      this.tasks.push(clone);
    },
    deleteTask(index){
      this.tasks.splice(index, 1)
    },
    addAnsver(obj){
      let clone = {
        text: '',
        right: false
      };
      obj.push(clone);
    },
    deleteAns(obj, index){
      obj.splice(index, 1);
    },
    clearAll(){
      this.tasks = [];
      this.testName = '';
    },
    makeOnlyOneRight(parent, index){
      for(let ind = 0; ind< parent.length; ind++){
        parent[ind].right = false;
        if(index == ind) {
          parent[ind].right = true;
        }
      }
    },
    async saveTest(){
      const res = await api.post(
          "api/test",
          {
            taskName: this.testName,
            tasks: this.tasks
          },{
          headers: {
            "x-requested-with": "*",
          }
        }
        );
      if(res){
        this.testCreated = true;
        this.createdTestId = res._id;
      }
    },
  }
};

</script>
<style scoped>
.task{
background-color: #d4ddcd;
}
.testCreated{
  color: #205d3b;
}
.ansver{
  background-color: #dbd3d4;
}
</style>
