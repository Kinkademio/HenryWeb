<template>
<q-card class="q-pa-lg" v-if="!testCreated">
  <q-card-section class="text-h5">
      Создание теста
  </q-card-section>
  <q-card-section>
    <q-input label="Введите название теста" v-model="testName">
    </q-input>
  </q-card-section>
  <q-separator>
  </q-separator>
  <q-card-section>

      <q-card class="q-ma-md task" v-for="(one, i) in tasks" :key="one">
        <q-card-section class="text-h6">
          Задание {{ i+1 }}
          <q-btn flat color="negative"  icon="delete" @click="deleteTask(i)"></q-btn>
        </q-card-section>
        <q-card-section>
          <q-input label="Введите текст задания" v-model="one.text"></q-input>
        </q-card-section>
        <q-card-separator></q-card-separator>

        <q-card-section>
          <q-card class="q-ma-md ansver" v-for="(ans, j) in one.ansvers" :key="j">
              <q-card-section class="text-h7">
                Ответ: {{ j+1 }}
                <q-btn flat color="negative"  icon="delete" @click="deleteAns(one.ansvers, j)"></q-btn>
              </q-card-section>

              <q-separator></q-separator>

              <q-card-section>
                <q-input label="Текст ответа" v-model="ans.text"></q-input>
                <q-checkbox label="Ответ является верным" v-model="ans.right" @click="makeOnlyOneRight(one.ansvers, j)"></q-checkbox>
              </q-card-section>

          </q-card>
          <q-btn flat color="positive" label="Добавить ответ"  icon="add" @click="addAnsver(one.ansvers)"></q-btn>
        </q-card-section>
      </q-card>

    <q-btn flat label="Добавить задание" color="positive" icon="add" @click="addTask"></q-btn>
  </q-card-section>
  <q-card-actions align="between">
    <q-btn label="Сохранить" color="positive" @click="saveTest"></q-btn>
    <q-btn label="Очистить" color="negative" @click="clearAll"></q-btn>
  </q-card-actions>

</q-card>
<q-card v-else class="q-pa-lg text-center">
  <q-card-hedar  class="text-h5 testCreated">
    Тест успешно создан!
  </q-card-hedar>
  <q-separator></q-separator>
  <q-card-section class="text-h6">
    Идентификатор: <span class="testCreated">{{ createdTestId }}</span>
  </q-card-section>
  <q-card-action>
    <q-btn flat color="positive" label="Создать еще один тест" @click="clearAll(); testCreated = false"></q-btn>
  </q-card-action>
</q-card>
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
      testName: '',
      tasks: [],
      testCreated: false,
      createdTestId: 0,
    };
  },
  mounted() {

  },
  methods: {
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
