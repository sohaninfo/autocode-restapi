#!/usr/bin/env python
import os
import argparse
import json
from jinja2 import Environment, FileSystemLoader
import re

mongo_model_template = "template_mongo_model.js"
template_service = "template_service.js"
template_controller = "template_controller.js"
template_route = "template_route.js"
template_validation = "template_validation.js"
base_dir = "output"

class RestApi():
    def __init__(self, fileName):
        f = open(fileName)
        self.data = json.load(f)
        self.file_loader = FileSystemLoader('templates')
        self.env = Environment(loader=self.file_loader)
        self.resourceName = self.data["resource"]

    def get_abs_filename(self, subdir, fname):
        fileName = base_dir + subdir + fname
        return fileName

    def update_index_file(self, indexFile, moduleName, exportModule):
        print("index file:{}".format(indexFile))
        print("module name:{}".format(moduleName))
        found = False
        if os.path.exists(indexFile):
            file_one = open(indexFile, "r")
            pattern = "."+moduleName+" "
            for word in file_one:
                if re.search(pattern, word):
                    print(word)
                    found = True

        if(found == False):
            print("Updating index file...")
            os.makedirs(os.path.dirname(indexFile), exist_ok=True)
            with open(indexFile, "a") as f:
                f.write("\n")
                f.write(exportModule)

    def write_to_file(self, fileName, contents):
        print("Writing to file:{}".format(fileName))
        os.makedirs(os.path.dirname(fileName), exist_ok=True)
        with open(fileName, "w") as f:
            f.write(contents)


    def render_template(self, templateName, data, fileName):
        template = self.env.get_template(templateName)
        output = template.render(data=data)
        self.write_to_file(fileName, output)

    def gen_mongo_module(self):
        subDir = "/src/model/"
        modelFileName = self.resourceName + ".model.js"
        fileName = self.get_abs_filename(subDir, modelFileName)
        self.render_template(mongo_model_template, self.data, fileName)
        indexFile = self.get_abs_filename(subDir, "index.js")
        moduleName = self.resourceName.capitalize()
        exportModule =  "module.exports."+moduleName+" = require('./"+self.resourceName.lower()+".model');"
        self.update_index_file(indexFile, moduleName, exportModule)

    def gen_service(self):
        subDir = "/src/services/"
        serviceFileName = self.resourceName + ".service.js"
        fileName = self.get_abs_filename(subDir, serviceFileName)
        self.render_template(template_service, self.data, fileName)
        indexFile = self.get_abs_filename(subDir, "index.js")
        moduleName = self.resourceName.lower()+"Service"
        exportModule =  "module.exports."+moduleName+" = require('./"+self.resourceName.lower()+".service');"
        self.update_index_file(indexFile, moduleName, exportModule)

    def gen_controller(self):
        subDir = "/src/controllers/"
        controllerFileName = self.resourceName + ".controller.js"
        fileName = self.get_abs_filename(subDir, controllerFileName)
        self.render_template(template_controller, self.data, fileName)
        indexFile = self.get_abs_filename(subDir, "index.js")
        moduleName = self.resourceName.lower()+"Controller"
        exportModule =  "module.exports."+moduleName+" = require('./"+self.resourceName.lower()+".controller');"
        self.update_index_file(indexFile, moduleName, exportModule)

    def gen_validation(self):
        subDir = "/src/validations/"
        valFileName = self.resourceName + ".validation.js"
        fileName = self.get_abs_filename(subDir, valFileName)
        self.render_template(template_validation, self.data, fileName)
        indexFile = self.get_abs_filename(subDir, "index.js")
        moduleName = self.resourceName.lower()+"Validation"
        exportModule =  "module.exports."+moduleName+" = require('./"+self.resourceName.lower()+".validation');"
        self.update_index_file(indexFile, moduleName, exportModule)

    def gen_route(self):
        subDir = "/src/routes/v1/"
        routeFileName = self.resourceName + ".route.js"
        fileName = self.get_abs_filename(subDir, routeFileName)
        self.render_template(template_route, self.data, fileName)
        indexFile = self.get_abs_filename(subDir, "index.js")
        #moduleName = self.resourceName.lower()+"Controller"
        #exportModule =  "module.exports."+moduleName+" = require('./"+self.resourceName.lower()+".controller');"
        #self.update_index_file(indexFile, moduleName, exportModule)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", help="Generate all modules!")
    args = parser.parse_args()
    if args.all:
        rapi = RestApi(args.all)
        rapi.gen_mongo_module()
        rapi.gen_service()
        rapi.gen_controller()
        rapi.gen_validation()
        rapi.gen_route()

if __name__ == "__main__":
    print("Rest API script version 1.0.1")
    main()