<template>

 
  <div class ="back2">
<v-card
    class= "mx-auto"
    max-width="1800"
    outlined
    raised
    shaped
  >
 <!-- <a>{{temp}}</a>
 <a>{{this.markers[0].label.text}}</a> -->
  <v-container class="back2">
    <v-layout text-center wrap>
      <v-flex mb-4>
        <br />
        <h1 class="font3">IOTree</h1>
        <p class="font2">Forest Evironmental Monitoring System</p>
      </v-flex>
    </v-layout>

                       <div>
                            <GmapMap
                              :center="center"
                              :map-type-id="mapTypeId"
                              ref="map"
                              position
                              click
                              :zoom="16"
                            >

                            <gmap-custom-marker 
                                  :marker="center2">
                                  <img src="https://www.oohmusic.com/profile/image/profile_image/27/xxxlarge" />
                                 <my-component>
                                  
                                 </my-component>
                            </gmap-custom-marker>
                              <GmapMarker
                                
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"  
                                :label="m.label"   
                                :draggable="false"
                                :clickable="true"
                                @click="toggleInfoWindow(m,index)"
                                style="width:12px;height:12px;"
                                :icon="{ url: require('../assets/logo22.png'),
                                scaledSize: {width: 5, height: 5},}" /> 

                                                           
                                <gmap-info-window
                                :options="infoOptions"
                                :position="infoWindowPos"
                                :opened="infoWinOpen"
                                @closeclick="infoWinOpen=false">


                                <div>
                                 <h2 class="font">Node 1</h2> <br>
                                 <h1 class="font2">
                                 อุณหภูมิ : &nbsp; {{temp}} <br> 
                                 ความชื้น : &nbsp; {{hum}} <br>
                                 แก๊ส : &nbsp; {{gas}} &nbsp; ppm.<br> 
                                 </h1>

                                 <br>
                                 <br>              
                                </div>
                          </gmap-info-window>
                              
                            
                            <GmapCircle
                                 :key="index"
                                v-for="(pin, index) in markers"
                                 :center="pin.position"
                                 :radius="150"
                                 :visible="true"
                                 :options="{fillColor:'green',fillOpacity:0.4,strokeWeight: 0.1}"
                             ></GmapCircle>
                             </GmapMap>
                          </div>

             <v-form ref="form" action  lazy-validation>
                     <!-- v-model="valid" -->

                  <!-- <v-row class="px-5" justify="space-between">
                        <v-btn color="error" @click="reset" >
                          <v-icon left>mdi-delete</v-icon>ล้างข้อมูล
                        </v-btn>

                        <v-btn color="success" @click="addRest" >
                          <v-icon left>mdi-shopping</v-icon>ยืนยันการลงทะเบียน
                        </v-btn>
                        </v-row> -->


    </v-form>

    


  </v-container>
</v-card>
</div>
</template>

<script>
import * as firebase from 'firebase'
import GmapCustomMarker from 'vue2-gmap-custom-marker';
//import { gmapApi } from "vue2-google-maps";
const firebaseConfig = {
    
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database()
  var refGas = database.ref("ESP8266_Test/gas/gas1/Data");
  var refHum = database.ref("ESP8266_Test/hum/hum1/Data");
  var refTemp = database.ref("ESP8266_Test/temp/temp1/Data");
  
  

export default {
  name: "videoRental",
  components: {
      'gmap-custom-marker': GmapCustomMarker
  },
  data() {
    return {
      RestData : {
      restName:"",
      restDescrition:"",
      resLa:"",
      resLong:"",
      resTiemtoOpent:"",
      restTimetoClose:""
      },
      center: { lat: 14.8747284, lng: 102.0234914 },
      center2: { lat: 15, lng: 103 },
    mapTypeId: "terrain",
    markers:[{
      position: { lat: 14.8744744, lng: 102.0236765 },
      label: 'Node A',
      infoText: 'Marker #1'
    },
    ],
    marker: {
        lat: 15,
        lng: 3.0247059387528408
      },
    cenMaker:"",
    position: {
      lat: 14.92890, //14.92890 // 102.05618 พิกัดป่าไม้
      lng: 102.05618
    },
    coordinates: "",
    locationRes:"",
    infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        dialog: false,
        gas:'5',
        temp:'',
        hum:''
     
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
 
    toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        // this.infoContent.name = marker.restName;
        // this.infoContent.dest = marker.restDescrition;
        this.infoContent = marker
        

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
   

    pushFristMaker(){
    //  this.allMaker.push({position :  this.position})
    //  alert(this.allMaker[0].lat)
      
    }
    
    
    /* eslint-enable no-console */
  },
  mounted() {
    this.pushFristMaker();
    

    //database
    refGas.on('value' , (snapshot) => {
        this.gas = snapshot.val()
    })

    refHum.on('value' , (snapshot) => {
        this.hum = snapshot.val()
    })

    refTemp.on('value' , (snapshot) => {
        this.temp = snapshot.val()
        this.markers[0].label = snapshot.val()
    })
    
   
  }
};
</script>
<style scoped>
.font {
  font-family: 'Prompt', sans-serif;
  font-size: 30px ;
  color: black;
}
.font2 {
  font-family: 'Prompt', sans-serif;
  font-size: 20px ;
  color: black;
}
.font3 {
  font-family: 'Prompt', sans-serif;
  font-size: 40px ;
  color: black;
}

.vue-map-container {
  height: 700px;
  max-width: 2000px;
  width: 100%;
}
  .back2 {
  background-image: url(../assets/bg1.png);
  background-size: cover;
  height: 900px;
}
</style>
